import css from "./SidebarNotes.module.css";
import Link from "next/link";

const SidebarNotes = () => {
  const tags = ["Todo", "Work", "Personal", "Meeting", "Shopping"];
  return (
    <>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/All" className={css.menuLink}>
            All
          </Link>
        </li>
        {tags.map((tag) => (
          <li key={tag} className={css.menuItem}>
            <Link href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarNotes;
