import axios from 'axios';

import { API_URL } from '../config';

export class API {
  public getHeaders(token: string, type: string) {
    let headers = {};
    if (type === 'bot') {
      headers = {
        Authorization: `Bearer ${token}`,
      };
    } else if (type === 'formio') {
      headers = {
        'x-jwt-token': token,
      };
    } else {
      throw Error('No type was passed to getHeaders');
    }

    return {
      headers,
      withCredentials: true, // include this line to add the withCredentials property
    };
  }
}

export class ChatClient extends API {
  public async history(token: string, payload: any) {
    const options = this.getHeaders(token, 'bot');
    let url = `${API_URL}/api/v1/langchain/chat/history`;
    if (payload.session) {
      url += '?';
      if (payload.session) {
        url += `session=${payload.session}`;
      }
    }
    return axios.get(url, options);
  }

  public async sendContextChatMessage(
    token: string,
    payload: {
      channel: string | undefined;
      question: string;
      system: string;
      model: string;
      temperature: number;
      sources: boolean;
      context: {
        faiss: {
          bucket_name: string | undefined;
          path: string;
        };
      };
    }
  ) {
    const options = this.getHeaders(token, 'bot');
    let url = `${API_URL}/api/proxy`;
    if (payload.channel) {
      url += '?';
      if (payload.channel) {
        url += `channel=${payload.channel}`;
      }
    }
    return axios.post(url, payload, options);
  }
}
