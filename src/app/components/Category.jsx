import Link from 'next/link'
import React from 'react'

export default function Category() {
    const catalog = [
        { title: 'Гранаты', active: true, links: '' },
        { title: 'Дым', active: true, links: '' },
        { title: 'Растяжки-мины', active: true, links: '' },
        { title: 'Пульты', active: true, links: '' },
        { title: 'Обмундирования', active: false, links: '' },
        { title: 'Пульки', active: false, links: '' },
        { title: 'Автоматы/Пистолеты', active: false, links: '' },
    ]
    return (
        <div className="category_items">
            {catalog.map((item, index) => (
                <Link className={item.active ? "category_item" : "category_item active"} href={`/category/${item.title}`} key={index}>
                    <div className="category_img_theme"><img src="./icons/free-icon-grenade-1281087.svg" alt={item.title}
                        className="category_icon" /></div>
                    <p  className="category_title">{item.title}</p>
                </Link>
            ))}
        </div>
    )
}
