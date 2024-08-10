import argparse

import json
import yt_dlp
 
def get_ub_info_json(url):
    try:
        
        # ℹ️ See help(yt_dlp.YoutubeDL) for a list of available options and public functions
        ydl_opts = {
            'abort-on-error': True,
            'quiet': True
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            info = ydl.extract_info(url, download=False)

            if not isinstance(info.get('duration'), (int, float)):
                raise ValueError("The 'duration' field is not a number.")

            # ℹ️ ydl.sanitize_info makes the info json-serializable
            print(json.dumps(ydl.sanitize_info(info)))
        
        # print("Download completed successfully!")
        
    except Exception as e:
        # print("Error url: " + url)
        # raise Exception("Error: ", str(e))
        print(json.dumps({'isOffline': True}))

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="UB Info")
    parser.add_argument("url", help="UB video URL")
    # parser.add_argument("output_path", help="Output file path")
    
    args = parser.parse_args()
    
    get_ub_info_json(args.url)