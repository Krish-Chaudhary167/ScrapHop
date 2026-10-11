import sys
import json
import os

def predict(image_path):
    try:
        from ultralytics import YOLO

        # Find model path
        script_dir = os.path.dirname(os.path.abspath(__file__))
        project_root = os.path.dirname(script_dir)
        
        model_paths = [
            os.path.join(project_root, "model.pt"),
            os.path.join(project_root, "best (1).pt"),
            os.path.join(project_root, "best.pt")
        ]
        
        model_file = None
        for p in model_paths:
            if os.path.exists(p):
                model_file = p
                break
                
        if not model_file:
            print(json.dumps({"success": False, "error": "Model file best (1).pt not found"}))
            return

        model = YOLO(model_file)
        results = model.predict(image_path, conf=0.25, verbose=False)
        
        # Mapping model labels to ScrapHop display labels
        label_map = {
            "cardboard": "Cardboard",
            "glass": "Glass",
            "metal": "Metal / Iron",
            "paper": "Paper / Books",
            "plastic": "Plastic",
            "trash": "Other"
        }

        detected = set()
        detections = []

        for r in results:
            for box in r.boxes:
                cls_id = int(box.cls[0])
                cls_name = model.names.get(cls_id, "").lower()
                conf = float(box.conf[0])
                
                mapped_name = label_map.get(cls_name, cls_name.capitalize())
                detected.add(mapped_name)
                detections.append({
                    "class": mapped_name,
                    "confidence": round(conf, 3),
                    "raw_class": cls_name
                })

        print(json.dumps({
            "success": True,
            "detectedTypes": list(detected),
            "detections": detections
        }))

    except Exception as e:
        print(json.dumps({"success": False, "error": str(e)}))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print(json.dumps({"success": False, "error": "No image path provided"}))
        sys.exit(1)
        
    image_file = sys.argv[1]
    predict(image_file)
