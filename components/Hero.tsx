import styles from "./Hero.module.css";

const Hero = () => {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.gradient} />
                <div className={styles.container}>
                    <div className={styles.content}>
                        <p className={styles.subtitle}>
                            🎀 Homemade Bakery
                        </p>
                        <h1 className={styles.title}>
                            Sweety
                            <br />
                            <span className={styles.titleAccent}>Bakery</span>
                        </h1>
                        <p className={styles.description}>
                            ร้านขนมหวานโฮมเมด อบสดใหม่ทุกวัน
                            <br />
                            หวานละมุน ส่งตรงถึงมือคุณ 🍰
                        </p>
                        <div className={styles.buttons}>
                            <a href="#menu" className={styles.btnPrimary}>
                                ดูเมนู
                            </a>
                            <a href="#about" className={styles.btnSecondary}>
                                เกี่ยวกับเรา
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageWrapper}>
                        <div className={styles.imageGlow}>
                            <div className={styles.imageBlur} />
                            <img
                                className={styles.heroImage}
                                src="donut.png"
                                alt="ขนมอร่อยจาก Sweety Bakery"
                            />
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className={styles.scrollIndicator}>
                    <svg
                        className={styles.scrollIcon}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </section>
        </>
    )
}
export default Hero