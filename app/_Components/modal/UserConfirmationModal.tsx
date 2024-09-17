
import React from 'react';
import { X } from 'lucide-react';
import {signOut, useSession} from 'next-auth/react';
import { toast } from 'react-toastify';

interface DeleteUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    onRedirect: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onConfirm, onRedirect }) => {
    const {update} = useSession();
    if (!isOpen) return null;

    const handleConfirm = async () => {
        try {
            await onConfirm();
            toast.success("Au revoir, à la prochaine !");
            await update(null)
            await signOut({redirect:false})
            onRedirect(); // Utiliser la fonction de redirection passée en prop
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
            toast.error("Une erreur est survenue lors de la suppression du compte.");
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-primary-foreground rounded-lg p-6 max-w-sm w-full">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-primary">Supprimer le compte</h3>
                    <button onClick={onClose} className="text-primary hover:text-gray-700">
                        <X size={24} />
                    </button>
                </div>
                <div className="mb-6">
                    <p>Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.</p>
                </div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={handleConfirm}
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Confirmer
                    </button>
                    <button
                        onClick={onClose}
                        className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        Annuler
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteUserModal;
