import { useNavigate } from "react-router-dom";
import { useApiCall } from "../../../data/useFetcher";
import { useEffect, useRef } from "react";
import RightSideModal from "../../../components/modals/rightsidemodal";
import PrimaryBtn from "../../../components/button";

export function PaymentFinalizeModal({
	isOpen,
	onClose,
	stateData,
	url = "/finalize",
	next = "/",
}: {
	isOpen: boolean;
	onClose: () => void;
	stateData: any;
	url?: string;
	next?: string;
}) {
	const { loading, onSubmitAPI } = useApiCall(),
		navigate = useNavigate(),
		onSubmit = async (e?: any) => {
			e?.preventDefault();

			await onSubmitAPI({
				url: `/api/v1/payment${url}`,
				type: "put",
				data: stateData,
				setResponse: () => {
					onClose();
					setTimeout(() => {
						navigate(next);
					}, 1500);
				},
			});
		};

	const calledRef = useRef(false);

	useEffect(() => {
		if (!stateData?.reference || calledRef.current) return;
		calledRef.current = true;

		const timer = setTimeout(() => {
			onSubmit();
		}, 1000);

		return () => clearTimeout(timer);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [stateData?.reference]);

	if (!isOpen) return null;

	return (
		<>
			<RightSideModal
				isOpen={isOpen}
				onClose={() => {
					if (!loading) onClose();
				}}
				disableExternalClose
				type="center"
				title="Payment Reconciliation">
				{stateData?.firstName && stateData?.lastName ? (
					<>
						<h4 className="text-center pb-5 font-semibold text-lg">
							Payment Validation for {stateData?.firstName}{" "}
							{stateData?.lastName}
						</h4>
					</>
				) : stateData?.fullname ? (
					<>
						<h4 className="text-center pb-5 font-semibold text-lg">
							Payment Validation for {stateData?.fullname}
						</h4>
					</>
				) : stateData?.email ? (
					<>
						<h4 className="text-center pb-5 font-semibold text-lg">
							Payment Validation for {stateData?.email}
						</h4>
					</>
				) : null}
				<PrimaryBtn
					type="button"
					text={"Validating"}
					loading={!!loading}
					className="w-80 mx-auto bg-[#2A8C56] py-3 text-white rounded-3xl"
					width={"w-80"}
				/>
			</RightSideModal>
		</>
	);
}
