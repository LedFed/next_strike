import Link from 'next/link';

const Breadcrumbs = ({ items }) => {

    return (
        <nav aria-label="Breadcrumb">
            <div/>
            <ol className="breadcrumb">
                {items.map((item, index) => (
                    <li key={index} className='breadcrumb_text'>
                        {item.link ? (
                            <Link href={item.link}>{item.title}</Link>
                        ) : (
                            <span aria-current="page">{item.title}</span>
                        )}
                    </li>
                ))}
            </ol>

        </nav>
    );
};

export default Breadcrumbs;
