// File generated from our OpenAPI spec by Stainless.

import * as Core from 'openai/core';
import { APIPromise } from 'openai/core';
import { APIResource } from 'openai/resource';
import { isRequestOptions } from 'openai/core';
import { AssistantStream, ThreadCreateAndRunParamsBaseStream } from 'openai/lib/AssistantStream';
import * as ThreadsAPI from 'openai/resources/beta/threads/threads';
import * as AssistantsAPI from 'openai/resources/beta/assistants/assistants';
import * as MessagesAPI from 'openai/resources/beta/threads/messages/messages';
import * as RunsAPI from 'openai/resources/beta/threads/runs/runs';
import { Stream } from 'openai/streaming';

export class Threads extends APIResource {
  runs: RunsAPI.Runs = new RunsAPI.Runs(this._client);
  messages: MessagesAPI.Messages = new MessagesAPI.Messages(this._client);

  /**
   * Create a thread.
   */
  create(body?: ThreadCreateParams, options?: Core.RequestOptions): Core.APIPromise<Thread>;
  create(options?: Core.RequestOptions): Core.APIPromise<Thread>;
  create(
    body: ThreadCreateParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<Thread> {
    if (isRequestOptions(body)) {
      return this.create({}, body);
    }
    return this._client.post('/threads', {
      body,
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
    });
  }

  /**
   * Retrieves a thread.
   */
  retrieve(threadId: string, options?: Core.RequestOptions): Core.APIPromise<Thread> {
    return this._client.get(`/threads/${threadId}`, {
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
    });
  }

  /**
   * Modifies a thread.
   */
  update(threadId: string, body: ThreadUpdateParams, options?: Core.RequestOptions): Core.APIPromise<Thread> {
    return this._client.post(`/threads/${threadId}`, {
      body,
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
    });
  }

  /**
   * Delete a thread.
   */
  del(threadId: string, options?: Core.RequestOptions): Core.APIPromise<ThreadDeleted> {
    return this._client.delete(`/threads/${threadId}`, {
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
    });
  }

  /**
   * Create a thread and run it in one request.
   */
  createAndRun(
    body: ThreadCreateAndRunParamsNonStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<RunsAPI.Run>;
  createAndRun(
    body: ThreadCreateAndRunParamsStreaming,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<AssistantsAPI.AssistantStreamEvent>>;
  createAndRun(
    body: ThreadCreateAndRunParamsBase,
    options?: Core.RequestOptions,
  ): APIPromise<Stream<AssistantsAPI.AssistantStreamEvent> | RunsAPI.Run>;
  createAndRun(
    body: ThreadCreateAndRunParams,
    options?: Core.RequestOptions,
  ): APIPromise<RunsAPI.Run> | APIPromise<Stream<AssistantsAPI.AssistantStreamEvent>> {
    return this._client.post('/threads/runs', {
      body,
      ...options,
      headers: { 'OpenAI-Beta': 'assistants=v1', ...options?.headers },
      stream: body.stream ?? false,
    }) as APIPromise<RunsAPI.Run> | APIPromise<Stream<AssistantsAPI.AssistantStreamEvent>>;
  }

  /**
   * Create a thread and stream the run back
   */
  createAndRunStream(
    body: ThreadCreateAndRunParamsBaseStream,
    options?: Core.RequestOptions,
  ): AssistantStream {
    return AssistantStream.createThreadAssistantStream(body, this._client.beta.threads, options);
  }
}

/**
 * Represents a thread that contains
 * [messages](https://platform.openai.com/docs/api-reference/messages).
 */
export interface Thread {
  /**
   * The identifier, which can be referenced in API endpoints.
   */
  id: string;

  /**
   * The Unix timestamp (in seconds) for when the thread was created.
   */
  created_at: number;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata: unknown | null;

  /**
   * The object type, which is always `thread`.
   */
  object: 'thread';
}

export interface ThreadDeleted {
  id: string;

  deleted: boolean;

  object: 'thread.deleted';
}

export interface ThreadCreateParams {
  /**
   * A list of [messages](https://platform.openai.com/docs/api-reference/messages) to
   * start the thread with.
   */
  messages?: Array<ThreadCreateParams.Message>;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata?: unknown | null;
}

export namespace ThreadCreateParams {
  export interface Message {
    /**
     * The content of the message.
     */
    content: string;

    /**
     * The role of the entity that is creating the message. Currently only `user` is
     * supported.
     */
    role: 'user';

    /**
     * A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that
     * the message should use. There can be a maximum of 10 files attached to a
     * message. Useful for tools like `retrieval` and `code_interpreter` that can
     * access and use files.
     */
    file_ids?: Array<string>;

    /**
     * Set of 16 key-value pairs that can be attached to an object. This can be useful
     * for storing additional information about the object in a structured format. Keys
     * can be a maximum of 64 characters long and values can be a maxium of 512
     * characters long.
     */
    metadata?: unknown | null;
  }
}

export interface ThreadUpdateParams {
  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata?: unknown | null;
}

export type ThreadCreateAndRunParams =
  | ThreadCreateAndRunParamsNonStreaming
  | ThreadCreateAndRunParamsStreaming;

export interface ThreadCreateAndRunParamsBase {
  /**
   * The ID of the
   * [assistant](https://platform.openai.com/docs/api-reference/assistants) to use to
   * execute this run.
   */
  assistant_id: string;

  /**
   * Override the default system message of the assistant. This is useful for
   * modifying the behavior on a per-run basis.
   */
  instructions?: string | null;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * The ID of the [Model](https://platform.openai.com/docs/api-reference/models) to
   * be used to execute this run. If a value is provided here, it will override the
   * model associated with the assistant. If not, the model associated with the
   * assistant will be used.
   */
  model?: string | null;

  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent
   * events, terminating when the Run enters a terminal state with a `data: [DONE]`
   * message.
   */
  stream?: boolean | null;

  /**
   * If no thread is provided, an empty thread will be created.
   */
  thread?: ThreadCreateAndRunParams.Thread;

  /**
   * Override the tools the assistant can use for this run. This is useful for
   * modifying the behavior on a per-run basis.
   */
  tools?: Array<
    AssistantsAPI.CodeInterpreterTool | AssistantsAPI.RetrievalTool | AssistantsAPI.FunctionTool
  > | null;
}

export namespace ThreadCreateAndRunParams {
  /**
   * If no thread is provided, an empty thread will be created.
   */
  export interface Thread {
    /**
     * A list of [messages](https://platform.openai.com/docs/api-reference/messages) to
     * start the thread with.
     */
    messages?: Array<Thread.Message>;

    /**
     * Set of 16 key-value pairs that can be attached to an object. This can be useful
     * for storing additional information about the object in a structured format. Keys
     * can be a maximum of 64 characters long and values can be a maxium of 512
     * characters long.
     */
    metadata?: unknown | null;
  }

  export namespace Thread {
    export interface Message {
      /**
       * The content of the message.
       */
      content: string;

      /**
       * The role of the entity that is creating the message. Currently only `user` is
       * supported.
       */
      role: 'user';

      /**
       * A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that
       * the message should use. There can be a maximum of 10 files attached to a
       * message. Useful for tools like `retrieval` and `code_interpreter` that can
       * access and use files.
       */
      file_ids?: Array<string>;

      /**
       * Set of 16 key-value pairs that can be attached to an object. This can be useful
       * for storing additional information about the object in a structured format. Keys
       * can be a maximum of 64 characters long and values can be a maxium of 512
       * characters long.
       */
      metadata?: unknown | null;
    }
  }

  export type ThreadCreateAndRunParamsNonStreaming = ThreadsAPI.ThreadCreateAndRunParamsNonStreaming;
  export type ThreadCreateAndRunParamsStreaming = ThreadsAPI.ThreadCreateAndRunParamsStreaming;
}

export interface ThreadCreateAndRunParamsNonStreaming extends ThreadCreateAndRunParamsBase {
  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent
   * events, terminating when the Run enters a terminal state with a `data: [DONE]`
   * message.
   */
  stream?: false | null;
}

export interface ThreadCreateAndRunParamsStreaming extends ThreadCreateAndRunParamsBase {
  /**
   * If `true`, returns a stream of events that happen during the Run as server-sent
   * events, terminating when the Run enters a terminal state with a `data: [DONE]`
   * message.
   */
  stream: true;
}

export interface ThreadCreateAndRunStreamParams {
  /**
   * The ID of the
   * [assistant](https://platform.openai.com/docs/api-reference/assistants) to use to
   * execute this run.
   */
  assistant_id: string;

  /**
   * Override the default system message of the assistant. This is useful for
   * modifying the behavior on a per-run basis.
   */
  instructions?: string | null;

  /**
   * Set of 16 key-value pairs that can be attached to an object. This can be useful
   * for storing additional information about the object in a structured format. Keys
   * can be a maximum of 64 characters long and values can be a maxium of 512
   * characters long.
   */
  metadata?: unknown | null;

  /**
   * The ID of the [Model](https://platform.openai.com/docs/api-reference/models) to
   * be used to execute this run. If a value is provided here, it will override the
   * model associated with the assistant. If not, the model associated with the
   * assistant will be used.
   */
  model?: string | null;

  /**
   * If no thread is provided, an empty thread will be created.
   */
  thread?: ThreadCreateAndRunStreamParams.Thread;

  /**
   * Override the tools the assistant can use for this run. This is useful for
   * modifying the behavior on a per-run basis.
   */
  tools?: Array<
    AssistantsAPI.CodeInterpreterTool | AssistantsAPI.RetrievalTool | AssistantsAPI.FunctionTool
  > | null;
}

export namespace ThreadCreateAndRunStreamParams {
  /**
   * If no thread is provided, an empty thread will be created.
   */
  export interface Thread {
    /**
     * A list of [messages](https://platform.openai.com/docs/api-reference/messages) to
     * start the thread with.
     */
    messages?: Array<Thread.Message>;

    /**
     * Set of 16 key-value pairs that can be attached to an object. This can be useful
     * for storing additional information about the object in a structured format. Keys
     * can be a maximum of 64 characters long and values can be a maxium of 512
     * characters long.
     */
    metadata?: unknown | null;
  }

  export namespace Thread {
    export interface Message {
      /**
       * The content of the message.
       */
      content: string;

      /**
       * The role of the entity that is creating the message. Currently only `user` is
       * supported.
       */
      role: 'user';

      /**
       * A list of [File](https://platform.openai.com/docs/api-reference/files) IDs that
       * the message should use. There can be a maximum of 10 files attached to a
       * message. Useful for tools like `retrieval` and `code_interpreter` that can
       * access and use files.
       */
      file_ids?: Array<string>;

      /**
       * Set of 16 key-value pairs that can be attached to an object. This can be useful
       * for storing additional information about the object in a structured format. Keys
       * can be a maximum of 64 characters long and values can be a maxium of 512
       * characters long.
       */
      metadata?: unknown | null;
    }
  }
}

export namespace Threads {
  export import Thread = ThreadsAPI.Thread;
  export import ThreadDeleted = ThreadsAPI.ThreadDeleted;
  export import ThreadCreateParams = ThreadsAPI.ThreadCreateParams;
  export import ThreadUpdateParams = ThreadsAPI.ThreadUpdateParams;
  export import ThreadCreateAndRunParams = ThreadsAPI.ThreadCreateAndRunParams;
  export import ThreadCreateAndRunParamsNonStreaming = ThreadsAPI.ThreadCreateAndRunParamsNonStreaming;
  export import ThreadCreateAndRunParamsStreaming = ThreadsAPI.ThreadCreateAndRunParamsStreaming;
  export import ThreadCreateAndRunStreamParams = ThreadsAPI.ThreadCreateAndRunStreamParams;
  export import Runs = RunsAPI.Runs;
  export import RequiredActionFunctionToolCall = RunsAPI.RequiredActionFunctionToolCall;
  export import Run = RunsAPI.Run;
  export import RunStatus = RunsAPI.RunStatus;
  export import RunsPage = RunsAPI.RunsPage;
  export import RunCreateParams = RunsAPI.RunCreateParams;
  export import RunCreateParamsNonStreaming = RunsAPI.RunCreateParamsNonStreaming;
  export import RunCreateParamsStreaming = RunsAPI.RunCreateParamsStreaming;
  export import RunUpdateParams = RunsAPI.RunUpdateParams;
  export import RunListParams = RunsAPI.RunListParams;
  export import RunCreateAndStreamParams = RunsAPI.RunCreateAndStreamParams;
  export import RunSubmitToolOutputsParams = RunsAPI.RunSubmitToolOutputsParams;
  export import RunSubmitToolOutputsParamsNonStreaming = RunsAPI.RunSubmitToolOutputsParamsNonStreaming;
  export import RunSubmitToolOutputsParamsStreaming = RunsAPI.RunSubmitToolOutputsParamsStreaming;
  export import RunSubmitToolOutputsStreamParams = RunsAPI.RunSubmitToolOutputsStreamParams;
  export import Messages = MessagesAPI.Messages;
  export import Annotation = MessagesAPI.Annotation;
  export import AnnotationDelta = MessagesAPI.AnnotationDelta;
  export import FileCitationAnnotation = MessagesAPI.FileCitationAnnotation;
  export import FileCitationDeltaAnnotation = MessagesAPI.FileCitationDeltaAnnotation;
  export import FilePathAnnotation = MessagesAPI.FilePathAnnotation;
  export import FilePathDeltaAnnotation = MessagesAPI.FilePathDeltaAnnotation;
  export import ImageFile = MessagesAPI.ImageFile;
  export import ImageFileContentBlock = MessagesAPI.ImageFileContentBlock;
  export import ImageFileDelta = MessagesAPI.ImageFileDelta;
  export import ImageFileDeltaBlock = MessagesAPI.ImageFileDeltaBlock;
  export import Message = MessagesAPI.Message;
  export import MessageContent = MessagesAPI.MessageContent;
  export import MessageContentDelta = MessagesAPI.MessageContentDelta;
  export import MessageDeleted = MessagesAPI.MessageDeleted;
  export import MessageDelta = MessagesAPI.MessageDelta;
  export import MessageDeltaEvent = MessagesAPI.MessageDeltaEvent;
  export import Text = MessagesAPI.Text;
  export import TextContentBlock = MessagesAPI.TextContentBlock;
  export import TextDelta = MessagesAPI.TextDelta;
  export import TextDeltaBlock = MessagesAPI.TextDeltaBlock;
  export import MessagesPage = MessagesAPI.MessagesPage;
  export import MessageCreateParams = MessagesAPI.MessageCreateParams;
  export import MessageUpdateParams = MessagesAPI.MessageUpdateParams;
  export import MessageListParams = MessagesAPI.MessageListParams;
}
