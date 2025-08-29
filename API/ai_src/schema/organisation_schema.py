from typing import List
from typing_extensions import Annotated, TypedDict


class OrganisationMatch(TypedDict):
    """A single match result."""
    
    client_id: Annotated[str, ..., "The request ID of the client from the actual database"]
    confidence_score: Annotated[float, ..., "A float between 0 and 1 indicating how strong the match is"]
    reason: Annotated[str, ..., "A brief explanation (1–3 sentences) explaining why the match was made."]


class OrganisationRecommendationResponse(TypedDict):
    """Response containing list of match results."""

    matches: Annotated[List[OrganisationMatch], ..., "A list of 10 or less client matches"]



 