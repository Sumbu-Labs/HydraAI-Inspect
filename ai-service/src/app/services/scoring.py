from typing import List, Dict
from datetime import datetime


class ScoringService:
    """Calculate inspection scores and severity levels"""
    
    # Map damage classes to severity levels
    CLASS_SEVERITY_MAP = {
        "shattered_glass": "High",
        "flat_tire": "Medium",
        "broken_lamp": "Medium",
        "dent": "Medium",
        "scratch": "Low",
        "crack": "Low",
    }

    # Weights for score penalty (0-100 scale)
    SEVERITY_PENALTIES = {
        "High": 25,
        "Medium": 15,
        "Low": 5,
    }
    
    def calculate_severity(self, damage_class: str, confidence: float) -> str:
        """
        Determine severity based on damage class and confidence
        Returns Title Case string: 'High', 'Medium', 'Low'
        """
        # Base severity from class
        base_severity = self.CLASS_SEVERITY_MAP.get(damage_class, "Low")
        
        # Upgrade severity if confidence is very high for certain types
        if base_severity == "Low" and confidence > 0.9:
            return "Medium"
            
        return base_severity
    
    def calculate_score(self, detections: List[Dict]) -> int:
        """
        Calculate overall inspection score (0-100)
        Starts at 100 and subtracts penalties for each damage found.
        """
        if not detections:
            return 100
        
        current_score = 100
        
        for detection in detections:
            damage_class = detection["class"]
            confidence = detection["confidence"]
            
            # Get severity
            severity = self.calculate_severity(damage_class, confidence)
            
            # Apply penalty
            penalty = self.SEVERITY_PENALTIES.get(severity, 5)
            
            # Adjust penalty by confidence (higher confidence = full penalty)
            weighted_penalty = penalty * confidence
            
            current_score -= weighted_penalty
        
        return int(max(0, min(100, current_score)))
    
    def build_vct_metadata(
        self,
        inspection_id: str,
        plate: str,
        vin: str,
        vehicle_label: str,
        detections: List[Dict],
        score: int,
    ) -> Dict:
        """Build VCT metadata for blockchain minting"""
        return {
            "vehicleInfo": {
                "plate": plate,
                "vin": vin,
                "label": vehicle_label,
            },
            "inspectionDate": datetime.utcnow().isoformat(),
            "damageCount": len(detections),
            "overallScore": score,
            "inspectionId": inspection_id,
        }


# Global instance
scoring_service = ScoringService()
