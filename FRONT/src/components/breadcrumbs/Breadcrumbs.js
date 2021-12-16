import React from "react";
import Breadcrumb from "antd/es/breadcrumb";




export default function Breadcrumbs({breads: breads}) {

    return (
        <Breadcrumb>
            {breads.map((row, index) => {
                return(
                    <Breadcrumb.Item href={row.href} key={index}>
                        {row.title}
                    </Breadcrumb.Item>
                )
            })}

        </Breadcrumb>
    );
};
