import { useState } from "react";
import axios, { AxiosError, isAxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import useErrorStore from "./stores/errorStore";
import useAuthStore from "./stores/authStore";
import { SetAuthToken, TOKEN } from "./Config";

export const apiMethodType = [
	"get",
	"post",
	"put",
	"patch",
	"file",
	"delete",
] as const;

export type APIMETHODTYPE = (typeof apiMethodType)[number];

type apiCallType = {
	type: APIMETHODTYPE;
	url: string;
	headers?: object | null;
	data?: object | null;
	noToast?: string | boolean;
	getter?: any;
	params?: object | null;
	getterErr?: object | null;
};

export type errArr = {
	message: string;
	path?: string;
};

export type resErr = {
	message?: string;
	error?: errArr[];
};

export type apiCallResType = {
	response?: any;
	errMsg?: string | null;
	errArr?: errArr[] | null;
};

export const apiCall = async ({
	type,
	url,
	data,
	getter,
	getterErr,
	headers,
	noToast,
	params,
}: apiCallType): Promise<apiCallResType> => {
	try {
		const cleanParams = removeFalsyRecursive({ ...params });
		const cleanData = removeFalsyRecursive({ ...data });

		// Special case: file upload
		const isFile = type === "file";
		const method = isFile ? "post" : type;

		const res: AxiosResponse = await axios({
			method,
			url: isFile ? "/api/v1/file" : url,
			data: isFile
				? data
				: ["get", "delete"].includes(type)
				? undefined
				: cleanData,
			headers: isFile
				? { "Content-Type": "multipart/form-data" }
				: { ...headers },
			params: cleanParams,
		});

		const response = res?.data;

		if (!["file", "get", "patch"]?.includes(type))
			if (!noToast) toast.success(res?.data?.message);
		if (getter) getter(response);
		return { response };
	} catch (error) {
		return handleApiError({ error, type, noToast, getterErr });
	}
};

export const useApiCall = () => {
	const [loading, setLoading] = useState<boolean | string>(false),
		{ returnErrors } = useErrorStore();

	const onSubmitApply = async ({
		type,
		url,
		toggleModal,
		data,
		loadingValue,
		setResponse,
		headers,
		noToast = false,
		params,
	}: apiCallType & { [key: string]: any }) => {
		// console.log({ data });

		let newLoad: string | boolean = true;
		if (loadingValue) newLoad = loadingValue;

		setLoading(newLoad);
		const { response, errArr, errMsg } = await apiCall({
			url,
			type,
			data,
			headers,
			noToast,
			params,
		});
		// console.log({ response, errArr, errMsg });
		setLoading(false);
		if (errArr) {
			setLoading(false);
			if (!noToast) toast.error(errArr?.[0]?.message);
			return returnErrors(errArr);
		}
		if (errMsg) {
			setLoading(false);
			return !noToast ? toast.error(errMsg) : null;
		}
		setLoading(false);
		if (response) {
			if (toggleModal) toggleModal(false);
			if (setResponse) setResponse(response);
			return;
		}
		setLoading(false);
	};

	return {
		loading,
		onSubmitAPI: onSubmitApply,
	};
};

const isPlainObject = (obj: object) =>
	Object.prototype.toString.call(obj) === "[object Object]";

export const removeFalsyRecursive = (obj: any): any => {
	if (Array.isArray(obj)) {
		const cleanedArr = obj
			.map(item => removeFalsyRecursive(item))
			.filter(
				val =>
					![undefined, null, "", 0].includes(val) &&
					!(isPlainObject(val) && Object.keys(val).length === 0)
			);
		return cleanedArr.length > 0 ? cleanedArr : undefined;
	} else if (isPlainObject(obj)) {
		Object.keys(obj).forEach(key => {
			const value = removeFalsyRecursive(obj[key]);
			if (
				[undefined, null, "", 0].includes(value) ||
				(isPlainObject(value) && Object.keys(value).length === 0)
			) {
				delete obj[key];
			} else {
				obj[key] = value;
			}
		});
		return Object.keys(obj).length > 0 ? obj : undefined;
	}
	return obj; // leave Dates, Files, Maps, Sets, class instances untouched
};

function handleApiError({
	type,
	error,
	noToast,
	getterErr,
}: {
	error: unknown;
	type: APIMETHODTYPE;
	noToast?: string | boolean;
	getterErr?: any;
}): apiCallResType {
	let message = "Unknown Error";
	if (error instanceof Error) message = error.message;

	if (isAxiosError(error)) {
		const err = error as AxiosError<resErr>;
		const status = err.response?.status;
		const data = err.response?.data;

		if (status === 429) toast.error(data as any);

		const errors = data?.error;

		if (type !== "get" || (type === "get" && noToast)) {
			if ((errors?.length && errors?.length > 1) || !data?.message) {
				// toast.error(errors[0]?.message);
				if (getterErr) getterErr({ errArr: errors });
				return { errArr: errors };
			}

			const errMsg =
				(typeof data === "object" && data && "message" in data
					? (data as { message?: string }).message
					: undefined) ||
				errors?.[0]?.message ||
				message;

			const possibleLogout: string[] = [
				"Invalid Authentication, Unauthorized User",
				"Unauthorized User, User not found",
			];

			if (possibleLogout?.includes(errMsg)) {
				localStorage.clear();
				window.location.reload();
			}
			if (getterErr) getterErr({ errMsg });
			return { errMsg };
		}
		if (getterErr) getterErr({ errMsg: message });
		return { errMsg: message };
	}
	if (getterErr) getterErr({ errMsg: message });
	return { errMsg: message };
}

export const numberWithCommas = (x?: string) => {
	return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : x;
};

export const nairaSignNeutral = "₦";

const useGenFetcher = () => {
	let { getErrorText, clearErrors } = useErrorStore(),
		{ getUser, getUserFail, getUserLoading } = useAuthStore(),
		loadUser = async () => {
			let token = localStorage.getItem(TOKEN);
			if (token) {
				SetAuthToken(token);

				getUserLoading();
				clearErrors();
				try {
					let res = await axios.get(`/api/v1/auth/user`);
					// console.log({ res: res?.data });
					if (res?.data?.data) {
						getUser(res.data);
					} else {
						getUserFail();
						getErrorText("Unauthorized User, Access denied");
					}
				} catch (error) {
					let message = "Unknown Error";
					if (error instanceof Error) message = error.message;
					if (isAxiosError(error)) {
						if (error)
							console.log({ error: error?.response?.data, err: error });
						if (error?.response?.status === 429)
							toast.error(error?.response?.data);
						const err = error;
						if (err) console.log({ error, err });
						if (err?.response?.data) {
							let errMsg =
								error?.response?.data?.message ||
								error?.response?.data?.error?.[0]?.message ||
								error?.response?.data?.error?.[0]?.msg ||
								error?.message ||
								message;

							getUserFail();
							getErrorText(errMsg);
						}
					}
				}
			} else {
				getUserFail();
				getErrorText("Unauthorized User, Access denied");
			}
		};
	return { loadUser };
};

export default useGenFetcher;

export const uploadFileToCloudinary = async ({
	file,
	recordType,
}: CloudUpload) => {
	const recordId = v4();
	if (file instanceof File) {
		const fileType = file?.type?.startsWith("video/")
			? "video"
			: file?.type?.startsWith("image/")
			? "image"
			: file?.type?.startsWith("application/")
			? "raw"
			: "auto";

		console.log({ fileType, file });

		// 1) Get signature & params
		const signRes = await axios.post(
			"/api/v1/upload/pre-sign",
			removeFalsyRecursive({
				recordType,
				recordId,
				resourceType: fileType,
			})
		);
		const {
			cloudName,
			apiKey,
			timestamp,
			signature,
			public_id,
			notification_url,
			context,
			folder,
			eager,
			eager_async,
			resource_type,
		} = await signRes.data?.data;

		// 2) Build form data and upload directly to Cloudinary
		const fd = new FormData();
		fd.append("file", file);
		if (apiKey) fd.append("api_key", apiKey);
		if (timestamp) fd.append("timestamp", String(timestamp));
		if (signature) fd.append("signature", signature);
		if (public_id) fd.append("public_id", public_id);
		if (context) fd.append("context", context);
		if (folder) fd.append("folder", folder);
		// include notification_url if you want Cloudinary to call your webhook after this upload
		if (notification_url) fd.append("notification_url", notification_url);
		if (fileType === "video") {
			if (eager) fd.append("eager", eager);
			if (eager_async) fd.append("eager_async", "true");
		}
		if (resource_type) fd.append("resource_type", resource_type);

		let uploadRes: Response;
		try {
			uploadRes = await fetch(
				`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
				{
					method: "POST",
					body: fd,
				}
			);
		} catch (err) {
			return { error: err };
		}

		if (!uploadRes.ok) {
			const errorJson = await uploadRes.json().catch(() => null);
			return {
				error: errorJson,
			};
		}

		const json = await uploadRes.json();
		return { data: json, recordId };
	}
	return {
		data: file,
		recordId,
	};
};

export const useCloudUpload = () => {
	const [loading, setLoading] = useState<boolean | string>(false);

	const onSubmitApply = async ({
		file,
		recordType,
		loadingValue,
	}: CloudUpload & {
		loadingValue?: string;
	}) => {
		// console.log({ data });

		let newLoad: string | boolean = true;
		if (loadingValue) newLoad = loadingValue;

		setLoading(newLoad);
		const response = await uploadFileToCloudinary({ file, recordType });
		// console.log({ response, errArr, errMsg });
		setLoading(false);

		setLoading(false);
		if (response) {
			return response;
		}
		setLoading(false);
	};

	return {
		loading,
		onSubmitAPI: onSubmitApply,
	};
};
