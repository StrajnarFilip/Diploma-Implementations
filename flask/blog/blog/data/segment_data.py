from typing import Any
from data import database


def segments_of_post(post_id: int) -> list[dict[str, Any]]:
    segments = database.find_all(
        "SELECT idsegment,post_idpost,type,text,source FROM public.segment WHERE post_idpost=%s;",
        [str(post_id)],
    )

    return list(
        map(
            lambda segment: {
                "idsegment": segment[0],
                "postIdpost": segment[1],
                "type": segment[2],
                "text": segment[3],
                "source": segment[4],
            },
            segments,
        )
    )


def segment_by_id(segment_id: int) -> Any:
    return database.find_single(
        "SELECT idsegment,post_idpost,type,text,source FROM public.segment WHERE idsegment=%s;",
        [str(segment_id)],
    )


def new_segment(post_id: int, type: str, text: str, source: str) -> dict[str, Any]:
    segment_id: int = database.insert_data_returning_id(
        """INSERT INTO public.segment (post_idpost,type,text,source)
        VALUES (%s,%s,%s,%s) RETURNING idsegment;""",
        [str(post_id), type, text, source],
    )

    segment = segment_by_id(segment_id)

    return {
        "idsegment": segment[0],
        "postIdpost": segment[1],
        "type": segment[2],
        "text": segment[3],
        "source": segment[4],
    }


def delete_segment(segment_id: int):
    database.delete_single_by_id(
        "DELETE FROM public.segment WHERE idsegment=%s;", segment_id
    )
    # TODO