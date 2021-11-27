export type Lookup<T> = { [k: string]: T };
export type AddressBookType = Lookup<string>;
export type NetworkAddressBookType = Lookup<AddressBookType>;
