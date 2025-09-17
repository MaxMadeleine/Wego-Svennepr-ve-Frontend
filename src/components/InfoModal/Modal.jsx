import { useEffect, useState } from "react";
import { apiService } from "../../services/apiService";
import { X } from "lucide-react";
import { ClipLoader } from "react-spinners";

export const Modal = ({ isOpen, onClose, contentId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !contentId) return;

    const loadData = async () => {
      setLoading(true);
      try {
        const res = await apiService.getContent(contentId);
        setData(res);
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isOpen, contentId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-lg my-20 mx-3 max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-primary"
        >
          <X className="w-6 h-6" />
        </button>

        {loading ? (
      <ClipLoader size={50} color="secondary" />
  ) : data ? (
          <article>
            <h2 className="text-2xl font-normal mb-4">{data.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: data.content }} />
          </article>
        ) : (
          <p className="text-gray-600">Ingen indhold fundet.</p>
        )}
      </div>
    </div>
  );
};

