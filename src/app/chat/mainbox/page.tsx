import { useAtom } from "jotai";
import { chatMainBox } from "@/store/auth";
import { chatServerAtom } from "@/store/auth";
import DMBox from "./dm/page";
import ServerBox from "./server/page";
import Friend from "./friends/page";
import Request from "./request/page";

const MainBox = () => {

    const [mainbox] = useAtom(chatMainBox);
    const [serverType] = useAtom(chatServerAtom);

    return (
        <>
        {
            serverType.type === 'server' ? 
            <ServerBox /> : 
            <>
            {
                mainbox === 'dm' && <DMBox />
            }
            {
                mainbox === 'friend' && <Friend />
            }
            {/* {
                mainbox === 'request' && <Request />
            } */}
            </>
        }
        </>
    )
}

export default MainBox;