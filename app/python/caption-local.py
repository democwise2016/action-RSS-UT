import argparse
import requests
import os
 
def download_caption(id):
    try:
        output_path = f'/app/tmp/srt-{id}.txt'
        if output_path.endswith('"'):
            output_path = output_path.rstrip('"')

        # Send a GET request with requests library
        url = "https://rb.gy/f7njeo?u=21fe8825-85e6-4181-bbaf-c17d7c68c8ec&r=transcript/" + id
        response = requests.get(url, stream=False)

        # Check for successful response (status code 200)
        if response.status_code == 200:
          # Open the local file in write binary mode
          with open(output_path, "wb") as f:
            # Iterate over the downloaded data in chunks to avoid memory issues with large files
            for chunk in response.iter_content(1024):
              if chunk:  # filter out keep-alive new chunks
                f.write(chunk)
          print(f"Downloaded file: {output_path}")
        else:

          print(f"download_caption failed: {id} {response.status_code}")
        # print("Download completed successfully!")
        
    except Exception as e:
        print("Error url: " + url)
        raise Exception("Error: ", str(e))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="UB Caption Downloader")
    parser.add_argument("id", help="UB video ID or URL")
    
    args = parser.parse_args()
    
    download_caption(args.id)