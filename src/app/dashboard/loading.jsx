// import { React, Suspense } from 'react';

// export default function loading() {
//     return (
//         <>
//             <div>...loading</div>

//         </>
//     )
// };
import React from "react";
import ContentLoader from "react-content-loader";

const loading = (props) => (
    <ContentLoader
        speed={2}
        width={317}
        height={430}
        viewBox="0 0 317 430"
        backgroundColor="#ededed"
        foregroundColor="#dedede"
        {...props}
    >
        <rect x="25" y="382" rx="8" ry="8" width="122" height="10" />
        <rect x="25" y="316" rx="9" ry="9" width="224" height="18" />
        <rect x="26" y="357" rx="5" ry="5" width="87" height="9" />
        <rect x="310" y="304" rx="0" ry="0" width="11" height="0" />
        <rect x="144" y="294" rx="0" ry="0" width="1" height="0" />
        <rect x="24" y="32" rx="5" ry="5" width="264" height="265" />
    </ContentLoader>
)

export default loading

