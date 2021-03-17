export class Vacation{
    public constructor(
        public id: number,
        public destination: string,
        public description: string,
        public imageUrl: string,
        public price: number,
        public startDate: Date,
        public endDate: Date,
        public followersAmount: number
    ){}
}