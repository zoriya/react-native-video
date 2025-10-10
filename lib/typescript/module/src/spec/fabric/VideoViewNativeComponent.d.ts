import type { ViewProps } from 'react-native';
import type { DirectEventHandler, Int32 } from 'react-native/Libraries/Types/CodegenTypes';
type OnNitroIdChangeEvent = Readonly<{
    nitroId: Int32;
}>;
export interface ViewViewNativeProps extends ViewProps {
    nitroId: Int32;
    onNitroIdChange?: DirectEventHandler<OnNitroIdChangeEvent>;
}
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<ViewViewNativeProps>;
export default _default;
//# sourceMappingURL=VideoViewNativeComponent.d.ts.map