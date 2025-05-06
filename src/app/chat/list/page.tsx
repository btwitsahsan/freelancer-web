import { useAtom } from "jotai";
import { chatServerAtom } from "@/store/auth";
import DMList from "./dmList";
import ChannelList from "./channelList";

const List = () => {

    const [server] = useAtom(chatServerAtom);
    
    return (
        <>
            {
                server.type === 'dm' ?
                <DMList /> :
                <ChannelList />
            }
        </>
    )
}

export default List;