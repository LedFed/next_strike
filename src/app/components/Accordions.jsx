'use client';
import { useState } from 'react';

const AccordionItem = ({ title, content, isOpen, onToggle }) => {
    return (
        <div className={isOpen ? 'accordion_content active' : 'accordion_content'}
            onClick={onToggle}>
            <h3 className={isOpen ? 'accordion_title active' : 'accordion_title'}>
                {title}
            </h3>
            <p className="accordion_descript">{content}</p>
            <hr />
        </div>
    );
};

const Accordions = ({ items }) => {
    const [openIndex, setOpenIndex] = useState(null);

    const handleToggle = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className='accordion_main'>
            {items.map((item, index) => (
                <AccordionItem
                    key={index}
                    title={item.title}
                    content={item.content}
                    isOpen={openIndex === index}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </div>
    );
};

export default Accordions;
