import { useRef } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface FileUploadProps {
  disabled?: boolean;
  onFilesSelected?: (files: File[]) => void;
}

export const FileUpload = ({ disabled = false, onFilesSelected }: FileUploadProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    if (!disabled && inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const fileList = Array.from(files);

    toast.success(`Attached ${fileList.length} file(s).`);
    onFilesSelected?.(fileList);
  };

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        variant="outline"
        size="icon"
        onClick={handleButtonClick}
        title="Attach document"
        disabled={disabled}
      >
        📎
      </Button>
    </>
  );
};
