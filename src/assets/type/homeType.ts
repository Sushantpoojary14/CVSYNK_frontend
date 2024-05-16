export type jobList = {
    id:number,
    job_title:string,
    job_description:string,
    company_name:string,
    state_id:number,
    job_requirement:string,
    job_category_id:string,
    city_id:number,
    user_id:number,
    posted_date:string,
    city: {
        id: 5,
        city_name: string,
        state_id: number
    },
    state: {
        id: 8,
        state_name: string
    }
}

export type indexType = { start: number; end: number };