import Link from 'next/link'
import React from 'react'

export default function Category() {
    const catalog = [
        { title: 'Гранаты', active: true, links: './icons/free-icon-grenade-1281087.svg', chapter:"Раздел страйкбольных гранат" },
        { title: 'Дым', active: true, links: './icons/free-icon-grenade-2514237.svg', chapter:"Раздел страйкбольных дымов и дымовых завес" },
        { title: 'МинаРастяжка', active: true, links: './icons/free-icon-grenade-13091752.svg', chapter:"Раздел страйкбольных мин и растяжек" },
        { title: 'Пульты', active: false, links: './icons/free-icon-remote-16276269.svg', chapter:"Раздел пультов для дистанционного запуска гранат, дымов и растяжек" },
        { title: 'Обмундирования', active: false, links: './icons/free-icon-paintball-1099542.svg', chapter:"Раздел страйкбольных гранат" },
        { title: 'Пульки', active: false, links: './icons/free-icon-paintball-588794_1.svg', chapter:"Раздел страйкбольных гранат" },
        { title: 'Автоматы/Пистолеты', active: false, links: './icons/icons8-оружие-для-пейнтбола-50.svg', chapter:"Раздел страйкбольных гранат" },
        { title: 'Петарды', active: true, links: './icons/squib.svg', chapter:"Раздел петард" },
    ]
    return (
        <div className="category_items">
            {catalog.map((item, index) => (
                item.active ?
                    <Link className={item.active ? "category_item" : "category_item active"} href={`/category/${item.title}`} key={index}>
                        <div className="category_img_theme"><img src={item.links} alt={item.chapter}
                            className="category_icon" /></div>
                        <p className="category_title">{item.title}</p>
                    </Link> : null
            ))}
        </div>
    )
}
