from typing import List
from typing_extensions import Annotated, TypedDict


class ClientMatch(TypedDict):
    """A single organisation match result."""
    _id: Annotated[str, ..., "The ID of the matched organisation"]
    request_id: Annotated[str, ..., "The ID of the request from which the match was derived"]
    confidence_score: Annotated[float, ..., "A float between 0 and 1 indicating the strength of the match"]
    reason: Annotated[str, ..., "A brief explanation (1–3 sentences) explaining why this organisation is a good fit"]


class CLientRecommendationResponse(TypedDict):
    """Response containing a list of organisation matches or a fallback message."""
    matches: Annotated[List[ClientMatch], ..., "A list of 10 or less client matches"]
