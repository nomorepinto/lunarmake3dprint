import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-auto bg-surface-container-lowest border-t border-outline-variant py-5 px-5">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center py-stack_lg px-margin_desktop max-w-container_max_width gap-stack_md">
        <span className="font-heading text-title-md font-bold text-primary">
          LunarMake 3D Print
        </span>
        <p className="font-sans text-body-sm text-on-surface-variant opacity-80">
          &copy; {new Date().getFullYear()} LunarMake 3D Print. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
