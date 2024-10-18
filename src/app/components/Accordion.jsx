import React, { useState } from 'react'

export default function Accordion() {
    const [openIndex, setOpenIndex] = useState(null);
    const items = [
        { title: 'Как сделать заказ?', content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel doloremquemolestias excepturi saepe laborum consequatur corrupti, tenetur magni reprehenderit nihil sunt numquam asperiores sed architecto vitae possimus' },
        { title: 'Как сделать заказ? 2', content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel doloremquemolestias excepturi saepe laborum consequatur corrupti, tenetur magni reprehenderit nihil sunt numquam asperiores sed architecto vitae possimus' },
        { title: 'Как сделать заказ? 3', content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel doloremquemolestias excepturi saepe laborum consequatur corrupti, tenetur magni reprehenderit nihil sunt numquam asperiores sed architecto vitae possimus' },
    ]
    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="accordion_main"
        >

            {/* <div className="accordion_content active">
                <h4 className="accordion_title active">Как сделать заказ?</h4>
                <p className="accordion_descript">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel doloremque
                    molestias excepturi saepe laborum consequatur corrupti, tenetur magni reprehenderit nihil sunt
                    numquam. Voluptatem asperiores sed architecto vitae possimus, quasi hic.</p>
                <hr />
            </div> */}

            {items.map((item, index) => (
                <div className={openIndex == index ? 'accordion_content active' : 'accordion_content'}
                    key={index}
                    // isOpen={openIndex == index}
                    onClick={() => handleToggle(index)}>
                    <h4 className={openIndex === index ? 'accordion_title active' : 'accordion_title'}>
                        {item.title}
                    </h4>
                    <p className="accordion_descript">{item.content}</p>
                    <hr />
                </div>
            ))}

        </div>
    )
}
