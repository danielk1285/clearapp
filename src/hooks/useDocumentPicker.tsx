import { useState } from 'react';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';

type FileType = {
    uri: string;
    name: string | null;
    copyError?: string | undefined;
    fileCopyUri?: string | null;
    type: string | null;
    size: number | null;
};

const useDocumentPicker = () => {
    const [file, setFile] = useState<FileType | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlePickDocument = async (): Promise<void> => {
        try {
            const result: DocumentPickerResponse[] | null = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
            });

            if (!result) {
                setError('No file selected');
                return;
            }

            const selectedFile: FileType = {
                name: result[0].name,
                uri: result[0].uri,
                type: result[0].type,
                size: result[0].size,
            };
            setFile(selectedFile);
            setError(null);
        } catch (err) {
            setError(`${err}`);
        }
    };

    return [file, handlePickDocument, error] as const;
};

export default useDocumentPicker;
