import LocalSwitcher from "@/components/LocalSwitcher";

export default function Header() {
  return (
    <header className="flex items-center justify-end">
      <nav>
        <LocalSwitcher />
      </nav>
    </header>
  );
}
