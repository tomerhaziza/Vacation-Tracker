export class NewVacationDetails{
    public constructor(
        public destination:string,
        public description:string,
        public imageUrl:string,
        public price:number,
        public startDate: string,
        public endDate: string
    ){}

}