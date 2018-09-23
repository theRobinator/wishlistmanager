import {ListItem} from './listitem';


export interface WishList {
	'ownerEmail': string;
	'ownerName': string;
	'items': ListItem[];
}
