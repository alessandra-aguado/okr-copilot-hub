import { useState } from "react";
import { FileText, Download, MoreHorizontal, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PDFAttachmentProps {
  fileName: string;
  fileSize: string;
  isUploading?: boolean;
  uploadProgress?: number;
  hasError?: boolean;
  onOpen?: () => void;
  onDownload?: () => void;
  onRetry?: () => void;
  onRemove?: () => void;
  className?: string;
}

const PDFAttachment = ({
  fileName,
  fileSize,
  isUploading = false,
  uploadProgress = 0,
  hasError = false,
  onOpen,
  onDownload,
  onRetry,
  onRemove,
  className = ""
}: PDFAttachmentProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (!isUploading && !hasError && onOpen) {
      onOpen();
    }
  };

  const getCardStyle = () => {
    if (hasError) {
      return "bg-red-50 border-red-200 hover:bg-red-100";
    }
    return "bg-slate-50 border-slate-200 hover:bg-slate-100 hover:shadow-sm";
  };

  const getIconColor = () => {
    if (hasError) return "text-red-500";
    if (isUploading) return "text-blue-500";
    return "text-slate-600";
  };

  return (
    <div
      className={`
        relative p-4 rounded-2xl border transition-all duration-200 cursor-pointer
        ${getCardStyle()}
        ${className}
      `}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`${hasError ? 'Error loading' : 'Open'} PDF: ${fileName}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={`flex-shrink-0 ${isUploading ? 'animate-pulse' : ''}`}>
          {hasError ? (
            <AlertTriangle size={20} className="text-red-500" />
          ) : (
            <FileText size={20} className={getIconColor()} />
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="font-medium text-slate-900 truncate text-sm">
            {fileName}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            {hasError ? (
              "No se pudo cargar"
            ) : isUploading ? (
              `Cargando... ${uploadProgress}%`
            ) : (
              `PDF • ${fileSize}`
            )}
          </div>
          
          {/* Progress Bar */}
          {isUploading && (
            <div className="mt-2 w-full bg-slate-200 rounded-full h-1">
              <div 
                className="bg-blue-500 h-1 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!isUploading && (
          <div className="flex items-center gap-2">
            {hasError ? (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRetry?.();
                  }}
                  className="text-xs h-7 px-3"
                >
                  Reintentar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove?.();
                  }}
                  className="text-xs h-7 px-3"
                >
                  Eliminar
                </Button>
              </div>
            ) : (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpen?.();
                  }}
                  className="text-xs h-7 px-3 bg-white hover:bg-slate-50"
                >
                  Abrir
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={(e) => e.stopPropagation()}
                      className="h-7 w-7 p-0 hover:bg-slate-200"
                    >
                      <MoreHorizontal size={14} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem onClick={onDownload}>
                      <Download size={14} className="mr-2" />
                      Descargar
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                      }}
                    >
                      <FileText size={14} className="mr-2" />
                      Copiar enlace
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFAttachment;