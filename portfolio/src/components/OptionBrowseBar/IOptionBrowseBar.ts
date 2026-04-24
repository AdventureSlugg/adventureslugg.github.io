export interface ISearchObject {
	id: string,
	title: string,
	categories: string[],
	desc?: string
}

export interface IBrowseBarProps {
	browserId: string,
	title: string;
	filters: string[];
	searchObjects: ISearchObject[]
}