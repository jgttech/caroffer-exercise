import { ArrowUpOutlined } from "@ant-design/icons";
import { Fade } from "@wmi/framework";

export const ArrowUp = () => {
    return (
        <>
            <Fade as="span" direction="up" show={true}>
                <ArrowUpOutlined />
            </Fade>
        </>
    );
}