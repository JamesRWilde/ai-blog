#!/usr/bin/env bash
set -euo pipefail

REMOTE=${1:-origin}
DEV_BRANCH=dev
MAIN_BRANCH=main
DEPLOY_BRANCH=deploy

function die() {
  echo "ERROR: $*" >&2
  exit 1
}

function ensure_clean_worktree() {
  if [[ -n "$(git status --porcelain)" ]]; then
    die "Working tree is not clean. Commit, stash, or discard changes before running this script."
  fi
}

function checkout_and_pull() {
  local branch=$1
  echo "\n--- checking out ${branch} ---"
  git checkout "$branch"
  echo "pulling ${branch} from ${REMOTE}..."
  git pull --ff-only "$REMOTE" "$branch"
}

function next_release_number() {
  local branch=$1
  local commit_count
  commit_count=$(git rev-list --count "$branch")
  echo $((commit_count + 2))
}

function verify_branch_exists() {
  local branch=$1
  if ! git show-ref --verify --quiet "refs/heads/$branch"; then
    die "Branch '$branch' does not exist locally. Create or fetch it before running this script."
  fi
}

ensure_clean_worktree

verify_branch_exists "$DEV_BRANCH"
verify_branch_exists "$MAIN_BRANCH"
verify_branch_exists "$DEPLOY_BRANCH"

checkout_and_pull "$DEV_BRANCH"
checkout_and_pull "$MAIN_BRANCH"
checkout_and_pull "$DEPLOY_BRANCH"

echo "\n--- rebasing ${MAIN_BRANCH} onto ${DEV_BRANCH} ---"
git checkout "$MAIN_BRANCH"
git rebase "$DEV_BRANCH"

echo "pushing ${MAIN_BRANCH} to ${REMOTE}..."
git push "$REMOTE" "$MAIN_BRANCH"

echo "\n--- merging ${MAIN_BRANCH} into ${DEPLOY_BRANCH} with squash + theirs ---"
git checkout "$DEPLOY_BRANCH"
git merge --squash --strategy-option=theirs "$MAIN_BRANCH"

RELEASE_NUMBER=$(next_release_number "$DEPLOY_BRANCH")
RELEASE_TAG="v$(date +%Y).$(date +%m).$(date +%d).${RELEASE_NUMBER}"

if git diff --cached --quiet; then
  echo "No changes to commit after squash merge. Nothing to do."
  exit 0
fi

echo "Committing squash merge as ${RELEASE_TAG}"
git commit -m "$RELEASE_TAG"

echo "\nDone. Created commit '$RELEASE_TAG' on branch '$DEPLOY_BRANCH'."
