export interface IToolBarOption {
	title: string;
	url: string;
	id: string;
	applicationId: string;
	iconSize?: 'large' | 'medium' | 'small',
	leftOption?: boolean;
}