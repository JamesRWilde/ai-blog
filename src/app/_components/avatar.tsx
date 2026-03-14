type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={picture}
        className="w-9 h-9 rounded-full ring-1 ring-white/10"
        alt={name}
      />
      <span className="text-sm font-medium text-zinc-400 tracking-wide">
        {name}
      </span>
    </div>
  );
};

export default Avatar;
