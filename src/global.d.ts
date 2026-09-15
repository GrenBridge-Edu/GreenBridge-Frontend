interface TabType {
	id: number;
	title: string;
	component: JSX.Element;
}

type ErrorType = {
	response: {
		data: { message: string; error: { msg?: string; message?: string }[] };
		message: string;
	};
	message: string;
};

type Profile = {
	createdAt: Date;
	isAdmin: boolean;
	isInviteAdmin: boolean;
	isSuperAdmin: boolean;
	privilege: "admin" | "superadmin";
	status: boolean;
	statusText: string;
	updatedAt: Date;
	_id: string;
	gender: string;
};
type UserProfile = Profile & {
	user: UserType;
};

type UserType = {
	_id: string;
	email: string;
	phone: string;
	roles: string[];
	status: string;
	type: string;
	firstName: string;
	lastName: string;
	avatar: string;
	telephone: string;
	referralCode: string;
	statusText: string;
	is2FAEnabled: "enable" | "disable";
	is2FAType: "mail" | "telephone" | "authenticator";
	image: any;
	extras: any;
};

type Sidebar = {
	name: string;
	url: string;
	icon: JSX.Element;
	permission?: string[];
};

type payData = {
	_id: string;
	createdAt?: string;
	serialNo?: string;
	[x: string]: any;
};

type dataType = {
	docs?: payData[];
	totalDocs?: number;
	docsTotal?: number;
	limit?: number;
	nextPage?: number;
	hasNextPage?: boolean;
};

type initType = {
	data: dataType | null;
	status?: string;
	search?: string;
	isFound?: boolean;
	mainSearch?: dataType | null;
	[key: string]: any;
};

const apiMethodType = [
	"get",
	"post",
	"put",
	"patch",
	"file",
	"delete",
] as const;

type APIMETHODTYPE = (typeof apiMethodType)[number];

type apiCallType = {
	type: APIMETHODTYPE;
	url: string;
	headers?: object | any;
	data?: object | any;
	noToast?: string | boolean;
	getter?: any;
};

type errArr = {
	message: string;
	path?: string;
};

type resErr = {
	message?: string;
	error?: errArr[];
};

type apiCallResType = {
	response?: any;
	errMsg?: string | null;
	errArr?: errArr[] | null;
};

declare module "*.wav" {
	const value: string;
	export default value;
}

type UpdateType = "view"|"edit"|"delete"

type CloudUpload = {
	file: File;
	recordType: "Program" | "Resource" | "Profile";
};