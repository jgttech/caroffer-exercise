import { ArrowDownOutlined } from "@ant-design/icons";
import { Fade } from "@wmi/framework";

export const ArrowDown = () => {
    return (
        <>
            <Fade as="span" direction="down" show={true}>
                <ArrowDownOutlined />
            </Fade>
        </>
    );
}