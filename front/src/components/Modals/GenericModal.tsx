import { EGenericButtonType } from "../../utils/general";
import GenericButton from "../GenericButton";

const GenericModal = ({ display, setDisplay, title = '', message, onClickAccept, acceptBtnLabel }) => {
  return (
    <>
      {display && (
        <div className="backdrop-blur-sm bg-black flex fixed w-screen h-screen inset-0 bg-opacity-30" style={{ zIndex: 999 }}>
          <div className="bg-white max-w-[50%] mx-auto my-auto rounded p-10">
            <h3 className="text-2xl text-semibold uppercase text-black font-bold text-center">
              {title}
            </h3>
            <p className="text-xl font-medium text-gray-600 py-4 text-center">
              {message}
            </p>
            <div className="flex space-x-6 border-t border-slate-200 pt-6">
              <GenericButton 
                label="Cancel"
                size="sm"
                onClick={() => setDisplay(false)}
              />
              <GenericButton 
                label={acceptBtnLabel}
                size="sm"
                onClick={() => {
                  onClickAccept()
                  setDisplay(false)
                }}
                buttonType={EGenericButtonType.CLOSE}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default GenericModal;