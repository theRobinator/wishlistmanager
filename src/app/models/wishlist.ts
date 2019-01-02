import {ListItem} from './listitem';


/**
 * A WishList loaded from the API.
 */
export interface WishList {
	'ownerEmail': string;
	'ownerName': string;
	'items': ListItem[];
}
