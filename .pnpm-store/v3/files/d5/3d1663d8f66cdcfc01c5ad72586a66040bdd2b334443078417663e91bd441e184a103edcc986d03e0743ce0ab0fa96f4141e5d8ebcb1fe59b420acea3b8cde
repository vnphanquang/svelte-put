import { CommandLineAction } from '@rushstack/ts-command-line';
import { ApiModel } from '@microsoft/api-extractor-model';
export interface IBuildApiModelResult {
    apiModel: ApiModel;
    inputFolder: string;
    outputFolder: string;
}
export declare abstract class BaseAction extends CommandLineAction {
    private _inputFolderParameter;
    private _outputFolderParameter;
    protected onDefineParameters(): void;
    protected buildApiModel(): IBuildApiModelResult;
    private _applyInheritDoc;
    /**
     * Copy the content from `sourceDocComment` to `targetDocComment`.
     * This code is borrowed from DocCommentEnhancer as a temporary workaround.
     */
    private _copyInheritedDocs;
}
//# sourceMappingURL=BaseAction.d.ts.map