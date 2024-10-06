// components/Breadcrumbs.js
import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumbs = ({ items }) => {
    // const router = useRouter();
    // const pathSegments = router.asPath.split('/').filter(segment => segment);

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
                {/* <li>
          <Link href="/">Home</Link>
        </li>
        {pathSegments.map((segment, index) => {
           const href = '/' + pathSegments.slice(0, index + 1).join('/');
           const displayName = index === pathSegments.length - 1 ? productName : segment;
          return (
            <li key={href}>
              <Link href={href}>{displayName}</Link>
            </li>
          );
        })} */}
            </ol>

        </nav>
    );
};

export default Breadcrumbs;
