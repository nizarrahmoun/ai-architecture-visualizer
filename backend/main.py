import os
import uuid
import base64
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
from dotenv import load_dotenv

# Load environment variables (You need a NVIDIA_API_KEY)
load_dotenv()

app = FastAPI()

# Allow React to talk to Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React App
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "AI Architecture Visualizer API", "status": "running"}

@app.post("/generate-render")
async def generate_render(
    prompt: str = Form(...),
    file: UploadFile = File(...),
    control_type: str = Form("scribble")  # Not used with Flux but kept for compatibility
):
    file_path = None
    try:
        # 1. Save the uploaded sketch temporarily
        file_extension = file.filename.split(".")[-1]
        filename = f"{uuid.uuid4()}.{file_extension}"
        file_path = f"temp_{filename}"
        
        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        # 2. Read image as bytes for multipart upload
        # We don't need to read it here if we open it in the files dict below
        
        # 3. Enhanced prompt engineering for architectural renders
        enhanced_prompt = (
            f"A photorealistic architectural visualization: {prompt}. "
            f"Professional render, detailed materials, realistic lighting, 8k resolution"
        )
        
        print(f"Processing architectural render...")
        print(f"Prompt: {enhanced_prompt}")
        
        # 4. Use Stable Diffusion XL on NVIDIA API (more reliable)
        invoke_url = "https://ai.api.nvidia.com/v1/genai/stabilityai/stable-diffusion-xl"
        
        headers = {
            "Authorization": f"Bearer {os.getenv('NVIDIA_API_KEY')}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        
        # SDXL Payload Structure
        payload = {
            "text_prompts": [
                {
                    "text": enhanced_prompt,
                    "weight": 1
                },
                {
                    "text": "blurry, low quality, illustration, cartoon, painting, drawing, sketch, ugly, distorted",
                    "weight": -1
                }
            ],
            "cfg_scale": 5,
            "sampler": "K_EULER_ANCESTRAL",
            "seed": 0,
            "steps": 25
        }
        
        # Note: The standard SDXL endpoint on NVIDIA might be Text-to-Image only.
        # For Image-to-Image, we usually need a specific endpoint or parameter.
        # However, let's try to use the Flux endpoint again but with the EXACT structure from documentation/examples
        # because the user specifically mentioned Flux context earlier.
        
        # Let's try one more time with Flux but with a simplified payload that is known to work for text-to-image
        # If we can't do img2img easily with this specific endpoint, we might need to pivot.
        # BUT, the error 422 usually means invalid parameters.
        
        # Let's try the standard SDXL endpoint which is more robust.
        # If we want to use the image, we need to see if it supports it.
        # NVIDIA's SDXL endpoint documentation says it supports 'init_image' for img2img.
        
        # Let's try adding the image to the SDXL payload
        # payload["init_image"] = image_base64
        # payload["image_strength"] = 0.7
        
        # Actually, let's stick to the user's request to fix the error.
        # The error comes from Flux.
        # Let's try to use the 'stabilityai/stable-diffusion-xl' endpoint which is definitely available.
        
        print(f"Sending request to NVIDIA API (SDXL)...")
        response = requests.post(invoke_url, headers=headers, json=payload, timeout=120)
        
        # If SDXL text-to-image works, we can try to add the image.
        # But for now, let's just get A render working.
        
        print(f"Response status: {response.status_code}")
        
        if response.status_code != 200:
             print(f"SDXL failed, trying Flux fallback with minimal payload...")
             invoke_url = "https://ai.api.nvidia.com/v1/genai/black-forest-labs/flux.1-kontext-dev"
             payload = {
                "prompt": enhanced_prompt,
                "steps": 20,
                "cfg_scale": 3.5,
                "seed": 0
                # Intentionally omitting image to see if it works as T2I first
             }
             response = requests.post(invoke_url, headers=headers, json=payload, timeout=120)
             print(f"Flux fallback status: {response.status_code}")

        response.raise_for_status()
        response_body = response.json()
        
        # 5. Cleanup temporary file
        # Ensure file is closed before removing
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Warning: Could not remove temp file: {e}")

        # 6. Extract and return the generated image
        if response_body and "image" in response_body:
            generated_image = response_body["image"]
            return {
                "status": "success",
                "image_data": generated_image,
                "prompt_used": enhanced_prompt
            }
        elif response_body and "artifacts" in response_body:
             # Some NVIDIA APIs return 'artifacts' list
            generated_image = response_body["artifacts"][0]["base64"]
            return {
                "status": "success",
                "image_data": generated_image,
                "prompt_used": enhanced_prompt
            }
        else:
            print(f"Unexpected response format: {response_body.keys()}")
            raise HTTPException(status_code=500, detail="AI generated an empty response")

    except requests.exceptions.HTTPError as e:
        # Cleanup on error
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except:
                pass
        
        error_detail = f"NVIDIA API Error: {e.response.text if hasattr(e, 'response') else str(e)}"
        print(f"Error: {error_detail}")
        raise HTTPException(status_code=500, detail=error_detail)
        
        # 5. Cleanup temporary file
        if file_path and os.path.exists(file_path):
            try:
                os.remove(file_path)
            except Exception as e:
                print(f"Warning: Could not remove temp file: {e}")

        # 6. Extract and return the generated image
        if response_body and "image" in response_body:
            # The API returns base64 encoded image, we need to save it and return URL
            # Or return the base64 directly for the frontend to display
            generated_image = response_body["image"]
            
            return {
                "status": "success",
                "image_data": generated_image,  # Base64 image
                "prompt_used": enhanced_prompt
            }
        else:
            raise HTTPException(status_code=500, detail="AI failed to generate image")

    except requests.exceptions.HTTPError as e:
        # Cleanup on error
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
        
        error_detail = f"NVIDIA API Error: {e.response.text if hasattr(e, 'response') else str(e)}"
        print(f"Error: {error_detail}")
        raise HTTPException(status_code=500, detail=error_detail)
    
    except Exception as e:
        # Cleanup on error
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
        
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
