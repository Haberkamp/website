type Properties = {
  title: string;
  number: string;
  href: string;
};

export function ProjectCard({ title, number, href }: Properties) {
  return (
    <a className="size-[250px] bg-[#2D1E0011] cursor-pointer ease-out-expo duration-200 transition-colors hover:bg-black hover:text-white p-4 flex flex-col justify-between">
      <div className="text-xl font-medium">{number}</div>

      <div className="flex items-center gap-2 self-center">
        <span className="text-lg font-medium">{title}</span>

        <ExternalLinkIcon />
      </div>
    </a>
  );
}

export function ExternalLinkIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.75 8.25V2.25H9.75V3.75H12.75V5.25H11.25V6.75H9.75V8.25H8.25V9.75H6.75V11.25H8.25V9.75H9.75V8.25H11.25V6.75H12.75V5.25H14.25V8.25H15.75ZM8.25 3.75H2.25V15.75H14.25V9.75H12.75V14.25H3.75V5.25H8.25V3.75Z"
        fill="currentColor"
        style={{ fill: "currentColor", fillOpacity: 1 }}
      />
    </svg>
  );
}
