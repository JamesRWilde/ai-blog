param(
    [string]$Remote = 'origin'
)

function Throw-Error {
    param([string]$Message)
    Write-Error $Message
    exit 1
}

function Ensure-CleanWorktree {
    $status = git status --porcelain
    if ($status) {
        Throw-Error 'Working tree is not clean. Commit, stash, or discard local changes before running this script.'
    }
}

function Ensure-BranchExists {
    param([string]$Branch)
    git show-ref --verify --quiet "refs/heads/$Branch"
    if ($LASTEXITCODE -ne 0) {
        Throw-Error "Branch '$Branch' does not exist locally. Create or fetch it before running this script."
    }
}

function Checkout-And-Pull {
    param([string]$Branch)
    Write-Host "`n--- checking out $Branch ---"
    git checkout $Branch
    if ($LASTEXITCODE -ne 0) { Throw-Error "Failed to checkout branch '$Branch'." }

    Write-Host "pulling $Branch from $Remote..."
    git pull --ff-only $Remote $Branch
    if ($LASTEXITCODE -ne 0) { Throw-Error "Failed to pull branch '$Branch' from '$Remote'." }
}

function Get-NextReleaseNumber {
    param([string]$Branch)
    $count = git rev-list --count $Branch
    if ($LASTEXITCODE -ne 0) { Throw-Error "Failed to count commits on branch '$Branch'." }
    return [int]$count
}

$devBranch = 'dev'
$mainBranch = 'main'
$deployBranch = 'deploy'

Ensure-CleanWorktree
Ensure-BranchExists $devBranch
Ensure-BranchExists $mainBranch
Ensure-BranchExists $deployBranch

Checkout-And-Pull $devBranch
Checkout-And-Pull $mainBranch
Checkout-And-Pull $deployBranch

Write-Host "`n--- rebasing $mainBranch onto $devBranch ---"
git checkout $mainBranch
if ($LASTEXITCODE -ne 0) { Throw-Error "Failed to checkout '$mainBranch'." }

git rebase $devBranch
if ($LASTEXITCODE -ne 0) { Throw-Error "Rebase of '$mainBranch' onto '$devBranch' failed." }

Write-Host "pushing $mainBranch to $Remote..."
git push $Remote $mainBranch
if ($LASTEXITCODE -ne 0) { Throw-Error "Failed to push '$mainBranch' to '$Remote'." }

Write-Host "`n--- merging $mainBranch into $deployBranch with squash + theirs ---"
git checkout $deployBranch
if ($LASTEXITCODE -ne 0) { Throw-Error "Failed to checkout '$deployBranch'." }

git merge --squash --strategy-option=theirs $mainBranch
if ($LASTEXITCODE -ne 0) { Throw-Error "Squash merge failed." }

$releaseNumber = Get-NextReleaseNumber $deployBranch
$releaseTag = "v$(Get-Date -Format 'yyyy.MM.dd').$releaseNumber"

git diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
    Write-Host 'No changes to commit after squash merge. Nothing to do.'
    exit 0
}

Write-Host "Committing squash merge as $releaseTag"
git commit -m $releaseTag
if ($LASTEXITCODE -ne 0) { Throw-Error 'Failed to create release commit.' }

Write-Host "`nDone. Created commit '$releaseTag' on branch '$deployBranch'."
