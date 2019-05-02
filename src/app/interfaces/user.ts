export class User {
    nick: string;
    subnick?: string;
    age?: number;
    email: string;
    friend: boolean;
    uid: any;
    status?: string;
    avatar?: string;
    friends?: any;
    timestamp?: any;

    public constructor (item?: User) {
        this.nick = item && item.nick ? item.nick : '';
        this.subnick = item && item.subnick ? item.subnick: '';
        this.age = item && item.age ? item.age : 0;
        this.email = item && item.email ? item.email : '';
        this.friend = item && item.friend ? item.friend : false;
        this.uid = item.uid && item.uid ? item.uid : null;
        this.status = item && item.status ? item.status : '';
        this.avatar = item && item.avatar ? item.avatar: '';
        this.friends = item && item.friends ? item.friends: [];
        this.timestamp = item && item.timestamp ? item.timestamp: '';
    }
}
