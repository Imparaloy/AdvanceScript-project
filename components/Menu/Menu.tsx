import CardMenu from "@/components/Card/CardMenu";
import menuItem from "@/data/menu.json";
import styles from "./Menu.module.css";

const Menu = () => {
  return (
    <section id="menu" className={styles.section}>
        <h2 className={styles.title}>
          เมนูของเรา
        </h2>
        <div className={styles.grid}>
          {menuItem.map((item) => (
            <CardMenu
              key={item.name}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
    </section>

    
    
  )
}
export default Menu