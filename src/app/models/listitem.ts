/**
 * An item in a wish list that has been loaded from the API.
 */
export interface ListItem {
	'id': number;
	'ownerEmail': string;
	'description': string;
	'buyerComments': string;
}
