import "../css/TrailerModal.css";

import YouTube from "react-youtube";

import { motion, AnimatePresence } from "framer-motion";

function TrailerModal({ isOpen, onClose, trailerKey }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="trailer-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* BACKDROP */}
          <div className="modal-backdrop" onClick={onClose}></div>

          {/* CONTENT */}
          <motion.div
            className="modal-content"
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            exit={{
              scale: 0.8,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>

            <YouTube
              videoId={trailerKey}
              opts={{
                width: "100%",
                height: "500",
                playerVars: {
                  autoplay: 1,
                },
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TrailerModal;
