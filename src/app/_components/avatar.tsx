type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <img
        src={picture}
        className="w-10 h-10 rounded-full ring-2 ring-white/10"
        alt={name}
      />
      <div className="text-base font-semibold text-zinc-300"
           style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {name}
      </div>
    </div>
  );
};

export default Avatar;
